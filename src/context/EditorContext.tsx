"use client";

import { createContext, useContext, useState } from "react";

type EditorContextType = {
  selectedFile: string;
  setSelectedFile: (file: string) => void;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFile, setSelectedFile] = useState("app/page.tsx");

  return (
    <EditorContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used inside EditorProvider");
  }

  return context;
}