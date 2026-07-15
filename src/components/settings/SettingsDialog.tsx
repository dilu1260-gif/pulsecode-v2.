"use client";

import { useSettings } from "@/hooks/useSettings";

import SettingsSection from "./SettingsSection";
import SettingRow from "./SettingRow";

export default function SettingsDialog() {
  const { settings, update } =
    useSettings();

  return (
    <div className="space-y-6">

      <SettingsSection title="Editor">

        <SettingRow label="Font Size">
          <input
            type="number"
            value={settings.editor.fontSize}
            min={10}
            max={32}
            onChange={(e) =>
              update({
                editor: {
                  fontSize: Number(
                    e.target.value
                  ),
                },
              })
            }
            className="w-20 rounded border border-zinc-700 bg-black px-2 py-1 text-white"
          />
        </SettingRow>

        <SettingRow label="Word Wrap">
          <input
            type="checkbox"
            checked={
              settings.editor.wordWrap
            }
            onChange={(e) =>
              update({
                editor: {
                  wordWrap:
                    e.target.checked,
                },
              })
            }
          />
        </SettingRow>

        <SettingRow label="Minimap">
          <input
            type="checkbox"
            checked={
              settings.editor.minimap
            }
            onChange={(e) =>
              update({
                editor: {
                  minimap:
                    e.target.checked,
                },
              })
            }
          />
        </SettingRow>

      </SettingsSection>

    </div>
  );
}