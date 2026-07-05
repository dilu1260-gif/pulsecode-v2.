export function FolderIcon({ open }: { open: boolean }) {
  return <span>{open ? "📂" : "📁"}</span>;
}

export function FileIcon() {
  return <span>📄</span>;
}