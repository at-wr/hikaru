---
title: Testing Single File Structure
published: 2024-02-01T12:00:00.000Z
draft: false
category: Testing
tags: [Test, Blog, Structure]
description: This post tests the single file structure for blog posts instead of using folders.
language: en
---

## Single File Structure

This blog post demonstrates that we support both:

1. **Folder structure**: `/content/posts/post-name/index.md`
2. **Single file structure**: `/content/posts/post-name.md`

Both approaches work seamlessly with Astro's content collections.

## Benefits of Single Files

For simple posts without attachments, single files are:
- Easier to manage
- Faster to create
- Less cluttered in the file system

## When to Use Folders

Use the folder structure when you need:
- Images or attachments
- Multiple related files
- Complex media assets

## Code Example

Here's a simple code block:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

This structure gives you flexibility in how you organize your content!
