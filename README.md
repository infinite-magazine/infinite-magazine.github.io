This is a landing page built with Next.js, Framer Motion, Three.js, Tailwind + TS according to this <a href="https://www.figma.com/design/jMdnz4YdkBLvnfUeiV9GVB/infinite-magazine?node-id=0-1&t=ijl8SsWsJVEPU08J-1" >design/mockup</a>

## How to start the dev server

```bash
npm i
```

```bash
npm run dev
```

## How to add team members

1. get an image of the team member
2. remove the bg on e.g. https://www.remove.bg/upload
3. crop / align in Figma in a square-ish (I used a 1195x1244) export frame
4. export from figma
5. convert to ascii: https://www.asciiart.eu/image-to-ascii
    use default settings, customize space density -> 2
6. download ascii
7. overlay both the ascii and image of the team member (the one with background) on the export frame, then export both
8. (optional) convert to webp or other format optimized for web
9. add both images to `public/members`
9. update array in `/data/team-members.ts`

## How to add / update issues

1. add cover image to `public/issues`
2. update array in `/data/team-members.ts`

___

if there's any other questions feel free to reach out to <a href="https://x.com/parzerp">on X</a> or via <a href="mailto:hi@adlerlagune.com">email</a>

> [!IMPORTANT]  
> As outlined in the contract / agreement the "built by adlerlagune" link should not be removed or adapted unless otherwise stated by adlerlagune OG