import type { BadgeParams, Theme } from "../types";

interface Props {
  value: BadgeParams;
  onChange: (value: BadgeParams) => void;
}

const USERNAME_REGEX = /^[a-zA-Z0-9-]{1,39}$/;

export function Controls({ value, onChange }: Props) {
  const isValid = USERNAME_REGEX.test(value.username);

  function update<K extends keyof BadgeParams>(key: K, val: BadgeParams[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <section className="border border-border rounded-xl p-4 space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm mb-1">
          GitHub username
        </label>
        <input
          id="username"
          value={value.username}
          onChange={(e) => update("username", e.target.value)}
          placeholder="alpha-diop"
          className={`w-full rounded-md bg-bg border px-3 py-2 outline-none ${
            value.username && !isValid ? "border-red-500" : "border-border"
          }`}
        />
        {value.username && !isValid && (
          <p className="text-xs text-red-400 mt-1">Invalid GitHub username</p>
        )}
      </div>

      <div className="flex gap-3">
        <select
          value={value.theme}
          onChange={(e) => update("theme", e.target.value as Theme)}
          className="bg-bg border border-border rounded-md px-3 py-2"
        >
          <option value="senegal">Senegal 🇸🇳</option>
          <option value="ocean">Ocean 🌊</option>
          <option value="github">GitHub</option>
          <option value="sunset">Sunset 🌅</option>
          <option value="forest">Forest 🌲</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!value.hide_graph}
            onChange={(e) => update("hide_graph", !e.target.checked)}
          />
          Show graph
        </label>
      </div>
    </section>
  );
}
