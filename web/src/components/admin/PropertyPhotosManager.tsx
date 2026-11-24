"use client";

import { useActionState, useId } from "react";
import {
  makeMainPhotoAction,
  removePropertyPhotoAction,
  uploadPropertyPhotosAction,
  type PhotoActionState,
} from "@/lib/property/photo-actions";
import type { PropertyImage } from "@/lib/property/types";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

const idle: PhotoActionState = { status: "idle" };
const input =
  "w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm";

function Feedback({ state }: { state: PhotoActionState }) {
  if (state.status === "idle" || !state.message) return null;
  return (
    <Alert tone={state.status === "error" ? "danger" : "success"}>{state.message}</Alert>
  );
}

function PhotoItem({
  propertyId,
  image,
  isMain,
  position,
}: {
  propertyId: string;
  image: PropertyImage;
  isMain: boolean;
  position: number;
}) {
  const [removeState, removeAction, removing] = useActionState(removePropertyPhotoAction, idle);
  const [mainState, mainAction, choosing] = useActionState(makeMainPhotoAction, idle);
  return (
    <li className="space-y-2 rounded-sm border border-border bg-surface p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.thumbnailUrl ?? image.url}
        alt={image.alt}
        width={640}
        height={480}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-sm object-cover"
      />
      <p className="text-xs text-ink/70">
        {isMain && (
          <span className="mr-1 rounded-sm bg-accent px-1.5 py-0.5 font-semibold text-white">
            Main photo
          </span>
        )}
        {image.alt}
      </p>
      <div className="flex flex-wrap gap-2">
        {!isMain && (
          <form action={mainAction}>
            <input type="hidden" name="id" value={propertyId} />
            <input type="hidden" name="url" value={image.url} />
            <Button type="submit" variant="secondary" className="px-3 py-1.5 text-xs" disabled={choosing}>
              Make main photo<span className="sr-only"> (photo {position})</span>
            </Button>
          </form>
        )}
        <form action={removeAction}>
          <input type="hidden" name="id" value={propertyId} />
          <input type="hidden" name="url" value={image.url} />
          <Button type="submit" variant="secondary" className="px-3 py-1.5 text-xs" disabled={removing}>
            Remove<span className="sr-only"> photo {position}</span>
          </Button>
        </form>
      </div>
      <Feedback state={removeState.status === "error" ? removeState : mainState} />
    </li>
  );
}

export function PropertyPhotosManager({
  propertyId,
  images,
  canEdit,
  reason,
}: {
  propertyId: string;
  images: PropertyImage[];
  canEdit: boolean;
  /** Why photos are read-only for this person, when they are. */
  reason?: string;
}) {
  const [state, uploadAction, uploading] = useActionState(uploadPropertyPhotosAction, idle);
  const id = useId();

  return (
    <section aria-labelledby={`${id}-h`} className="space-y-4">
      <h2 id={`${id}-h`} className="text-lg font-semibold text-ink">
        Photos ({images.length})
      </h2>
      {images.length === 0 && (
        <p className="text-sm text-ink/70">No photos yet. The first photo you add is the main one, shown on listing cards.</p>
      )}
      {images.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <PhotoItem key={image.url} propertyId={propertyId} image={image} isMain={i === 0} position={i + 1} />
          ))}
        </ul>
      )}

      {canEdit ? (
        <form action={uploadAction} className="space-y-3 rounded-sm border border-border bg-surface p-4">
          <input type="hidden" name="id" value={propertyId} />
          <div className="space-y-1">
            <label htmlFor={`${id}-files`} className="block text-sm font-medium text-ink">
              Add photos
            </label>
            <input
              id={`${id}-files`}
              name="photos"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              required
              aria-describedby={`${id}-files-hint`}
              className="block w-full text-sm"
            />
            <p id={`${id}-files-hint`} className="text-xs text-ink/60">
              JPEG, PNG or WebP, up to 10 MB each and 20 per property. Photos
              are cropped to landscape (4:3), and hidden camera data such as
              location is removed. Only use photos you have permission to use.
            </p>
          </div>
          <div className="space-y-1">
            <label htmlFor={`${id}-alt`} className="block text-sm font-medium text-ink">
              Describe the photo(s)
            </label>
            <input
              id={`${id}-alt`}
              name="alt"
              required
              minLength={5}
              maxLength={150}
              placeholder="e.g. Living room with bay window"
              aria-describedby={`${id}-alt-hint`}
              className={input}
            />
            <p id={`${id}-alt-hint`} className="text-xs text-ink/60">
              Read aloud to blind visitors. Upload different rooms separately so
              each gets its own description.
            </p>
          </div>
          <Button type="submit" disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </Button>
          <Feedback state={state} />
        </form>
      ) : (
        reason && <Alert tone="info">{reason}</Alert>
      )}
    </section>
  );
}
