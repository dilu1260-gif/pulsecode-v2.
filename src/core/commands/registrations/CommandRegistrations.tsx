"use client";

import EditorCommandRegistration from "./EditorCommandRegistration";
import SettingsCommandRegistration from "./SettingsCommandRegistration";
import WorkspaceCommandRegistration from "./WorkspaceCommandRegistration";

export default function CommandRegistrations() {
  return (
    <>
      <EditorCommandRegistration />
      <SettingsCommandRegistration />
      <WorkspaceCommandRegistration />
    </>
  );
}