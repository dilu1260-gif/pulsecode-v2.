# PulseCode Command Specification

## Philosophy

Every action inside PulseCode is a command.

Commands are the single source of truth.

A command may be triggered by:

- Keyboard Shortcut
- Context Menu
- Toolbar
- AI
- Command Palette
- Plugin
- API

Every entry point executes exactly the same implementation.

---

# Naming Convention

Commands use lowercase dot notation.

Examples:

```
file.save
file.close
file.rename

explorer.copy
explorer.cut
explorer.paste
explorer.delete
explorer.duplicate

editor.undo
editor.redo
editor.format

terminal.run
terminal.stop

git.commit
git.push

ai.generate
ai.refactor

workspace.search
```

---

# Rules

Every command must:

- Have a unique ID
- Perform one responsibility
- Be reusable
- Never depend directly on UI components
- Be callable from any source

---

# Inputs

Commands may accept structured arguments.

Example:

```
file.rename

{
  oldPath,
  newPath
}
```

---

# Outputs

Commands return either:

- Success
- Failure

Future versions may return structured data.

---

# AI

AI never edits files directly.

Instead it executes commands.

Example:

Goal:

Create Login Screen

↓

```
create.file

write.file

save.file

run.terminal
```

↓

Done

---

# Plugins

Plugins register commands.

Example:

```
tailwind.sortClasses

docker.compose.up

eslint.fix
```

---

# Future

The following systems execute commands:

- Keyboard Shortcuts
- Context Menus
- Toolbar
- Command Palette
- AI Agents
- Plugins

Everything speaks the same command language.