// hack para entender as extenções do SCSS como clases

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
