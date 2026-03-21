// Provide image import types for tsc when .next hasn't been generated yet (e.g. CI).
// next/image-types/global covers these at runtime but requires .next/dev/types to load.
declare module "*.jpg" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
declare module "*.JPG" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
declare module "*.jpeg" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
declare module "*.JPEG" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
declare module "*.png" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
declare module "*.PNG" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
declare module "*.webp" {
  const content: import("next/dist/client/image-component").StaticImport;
  export default content;
}
