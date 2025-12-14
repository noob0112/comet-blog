# Documentation Guidelines for Agents

## CRITICAL: Always Update Documentation

**Every code change must be accompanied by documentation updates.** This is not optional. Poor documentation compounds over time and creates technical debt.

## When Implementing Changes

1. **Update source files first**: Always modify actual component/config files before documentation
2. **Test functionality**: Verify changes work correctly before documenting
3. **Update relevant docs immediately**: Document every change that affects:
   - Architecture (folder structures, routing logic, state management)
   - Features (new components, theme features, i18n keys)
   - Configuration (tsconfig, eslint, tailwind)
   - Design system (color variables, theme mappings, prose styles)
   - Integrations (new libraries, plugins, build config)
   - Conventions (naming patterns, file structure, code organization)
4. **Keep patterns consistent**: Follow existing code organization and naming conventions
5. **Update .github/copilot-instructions.md**: Update relevant sections to reference AGENTS.md

## Documentation Update Checklist

- ❌ **Never skip documentation** - No "I'll document this later" promises
- ✅ Update the relevant section in appropriate docs file **immediately** after code changes
- ✅ Include specific file paths, variable names, and code examples
- ✅ Document **why** decisions were made, not just **what** was done
- ✅ Update "Current Implementation Status" when features are added/completed
- ✅ Update .github/copilot-instructions.md if it references the changed areas

## What Requires Documentation Updates

| Change Type               | Examples                                                                 | Action                               |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| **Architecture changes**  | New folder structures, modified routing logic, state management patterns | Update `docs/agents/architecture.md` |
| **Feature additions**     | New theme features, i18n keys, components, utility classes               | Update appropriate module file       |
| **Configuration changes** | Updated tsconfig, eslint rules, tailwind config                          | Update `docs/agents/conventions.md`  |
| **Color/Design system**   | New color variables, updated theme mappings, prose styling               | Update `docs/agents/theme.md`        |
| **Integration changes**   | New libraries, modified build config, new plugins                        | Update `docs/agents/integrations.md` |
| **Conventions**           | New naming patterns, updated file structure, code organization           | Update `docs/agents/conventions.md`  |
| **Implementation status** | Features completed or partially completed                                | Update `docs/agents/status.md`       |

## Documentation Style Guidelines

- Use **bold** for important terms and file paths
- Include code examples for complex features
- Add comments explaining "why" not just "what"
- Keep sections organized by feature/domain
- Link to relevant files when possible
- Use consistent terminology throughout

## Example: Proper Documentation Update

When adding a new feature, document it like this:

````markdown
### Your New Feature

Brief description of what it does.

**Files involved:**

- `app/path/to/feature.ts` - Core functionality
- `app/path/to/component.vue` - UI component

**Usage example:**

```typescript
// Show how to use it
```
````

**Configuration:**

- List any config options
- Explain defaults and overrides

**Notes:**

- Any important caveats
- Performance considerations
- Browser compatibility

Then update the status.md file if appropriate.

## Maintenance Reminders

- This documentation is your tool for maintaining code quality
- Undocumented changes lead to confusion and bugs
- Future changes build on current foundation - document well
- When in doubt about what should be documented, document it
- Review documentation files before making any significant changes
