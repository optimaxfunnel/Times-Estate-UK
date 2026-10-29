import { hasPermission, type Role } from "@/lib/auth/roles";

/**
 * Storage boundary for repair-report photos and documents. NOT CONNECTED:
 * no storage provider is approved (INTEGRATIONS.md), so today files are
 * checked and then discarded — only a description is kept on the lead.
 *
 * The rules any real implementation must follow are fixed here, so they
 * cannot be skipped when a provider is plugged in:
 *
 *  - PRIVATE: files go in a private bucket; there is never a public URL.
 *  - AUTHORISED ACCESS: staff open a file only through a short-lived
 *    signed link issued after `canOpenAttachment` passes (Managers and
 *    Administrators — the roles that manage leads).
 *  - SCAN BEFORE OPEN: a file starts "pending_scan"; it can be opened
 *    only once a malware scanner marks it "clean". "infected" files are
 *    quarantined and never served.
 *  - RETENTION: proposed default — delete 12 months after the repair
 *    lead is closed (owner to confirm; see AUTOMATION_WORKFLOWS.md).
 */
export type ScanStatus = "pending_scan" | "clean" | "infected";

export interface StoredAttachment {
  id: string;
  leadId: string;
  safeName: string;
  type: string;
  sizeBytes: number;
  scanStatus: ScanStatus;
  storedAt: string;
}

export interface AttachmentStore {
  isConfigured(): boolean;
  put(leadId: string, file: File, safeName: string): Promise<StoredAttachment>;
  /** Short-lived signed link; implementations must refuse unless the file is clean. */
  signedUrl(attachment: StoredAttachment, ttlSeconds: number): Promise<string>;
  deleteForLead(leadId: string): Promise<void>;
}

export const RETENTION_MONTHS_AFTER_CLOSE = 12;
export const SIGNED_LINK_TTL_SECONDS = 300;

export function canOpenAttachment(
  role: Role,
  attachment: Pick<StoredAttachment, "scanStatus">,
): { allowed: true } | { allowed: false; reason: string } {
  if (!hasPermission(role, "manage_leads")) {
    return {
      allowed: false,
      reason: "Your role cannot open repair attachments.",
    };
  }
  if (attachment.scanStatus !== "clean") {
    return {
      allowed: false,
      reason:
        attachment.scanStatus === "infected"
          ? "This file failed the malware scan and is quarantined."
          : "This file has not been scanned yet.",
    };
  }
  return { allowed: true };
}

export function retentionDeleteAfter(closedAt: Date): Date {
  const d = new Date(closedAt);
  d.setMonth(d.getMonth() + RETENTION_MONTHS_AFTER_CLOSE);
  return d;
}

/** Today's store: refuses everything, so no file can be kept by accident. */
export const attachmentStore: AttachmentStore = {
  isConfigured: () => false,
  put: async () => {
    throw new Error("No attachment storage approved (INTEGRATIONS.md).");
  },
  signedUrl: async () => {
    throw new Error("No attachment storage approved (INTEGRATIONS.md).");
  },
  deleteForLead: async () => {},
};
