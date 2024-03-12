export const tableClassNames =
{
  wrapper: "min-h-screen -my-16 pt-16 justify-start",
  base: "max-h-[500px]",
  th: "bg-primary-600 text-white text-sm  ",
  tr: [
    "text-xs focus:bg-primary-50 border-b border-primary-50",
    "data-[selected=true]:bg-primary-50",
    "data-[hover=true]:bg-primary-50"
  ],
  td: ["data-[selected=true]:bg-primary-50"]
}

export const tableClassNamesFiltroProd =
{
  wrapper: "min-h-screen -my-16 pt-0 justify-start",
  base: "max-h-[500px]",
  th: "bg-primary-600 text-white text-sm  ",
  tr: [
    "text-xs focus:bg-primary-50 border-b border-primary-50",
    "data-[selected=true]:bg-primary-50",
    "data-[hover=true]:bg-primary-50"
  ],
  td: ["data-[selected=true]:bg-primary-50"]
}


export const tableClassNamesTwo = {
  wrapper: "min-h-screen -my-16 pt-16 justify-start",
  base: "max-h-[520px] overflow-scroll",
  table: "min-h-[420px]",
  th: "bg-primary-600 text-white text-sm  ",
  tr: [
    "text-xs focus:bg-primary-50 border-b border-primary-50",
    "data-[selected=true]:bg-primary-50",
    "data-[hover=true]:bg-primary-50"
  ],
  td: ["data-[selected=true]:bg-primary-50"]
}

export const tableClassNamesEditor = {
  wrapper: "min-h-screen -my-16 pt-16 justify-start",
  // base: "max-h-[520px] overflow-scroll",
  base: "max-h-[400px]",
  //th: "bg-white border-b border-primary-600 border-r-0 border-l-0 text-black text-sm font-normal py-2",  
  th: "bg-primary-50 rounded-none text-black text-sm  py-2",
  tr: [
    "text-xs leading-4 focus:bg-primary-50 ", // Ajustado leading-4
    "data-[selected=true]:bg-primary-50",
    "data-[hover=true]:bg-primary-50"
  ],

  td: [
    "py-0",
    "px-3",
    "relative",
    "align-middle",
    "whitespace-normal",
    "text-small",
    "font-normal",
    "outline-none",
    "[&>*]:z-0",
    "[&>*]:relative",

    // before content for selection
    // "before:content-['']",
    // "before:absolute",
    // "before:z-0",
    // "before:inset-0",
    // "before:opacity-0",
    // "data-[selected=true]:before:opacity-100",
    // // disabled
    // "group-data-[disabled=true]:text-foreground-300",
  ],
  variants: {
    radius: {
      none: {
        wrapper: "rounded-none",
      },
      sm: {
        wrapper: "rounded-small",
      },
      md: {
        wrapper: "rounded-medium",
      },
      lg: {
        wrapper: "rounded-large",
      },
    }
  }


  //["data-[selected=true]:bg-primary-50"]
};


export const tableClassNamesEditorMovimentos = {
  wrapper: "min-h-screen -my-16 pt-16 justify-start",
  // base: "max-h-[520px] overflow-scroll",
  base: "max-h-[400px]",
  //th: "bg-white border-b border-primary-600 border-r-0 border-l-0 text-black text-sm font-normal py-2",  
  th: "bg-gray-200 rounded-none text-black text-sm  py-2",
  tr: [
    "text-xs leading-4 focus:bg-primary-50 ", // Ajustado leading-4
    "data-[selected=true]:bg-primary-50",
    "data-[hover=true]:bg-primary-50"
  ],

  td: [
    "py-0",
    "px-3",
    "relative",
    "align-middle",
    "whitespace-normal",
    "text-small",
    "font-normal",
    "outline-none",
    "[&>*]:z-0",
    "[&>*]:relative",

    // before content for selection
    // "before:content-['']",
    // "before:absolute",
    // "before:z-0",
    // "before:inset-0",
    // "before:opacity-0",
    // "data-[selected=true]:before:opacity-100",
    // // disabled
    // "group-data-[disabled=true]:text-foreground-300",
  ],
  variants: {
    radius: {
      none: {
        wrapper: "rounded-none",
      },
      sm: {
        wrapper: "rounded-small",
      },
      md: {
        wrapper: "rounded-medium",
      },
      lg: {
        wrapper: "rounded-large",
      },
    }
  }


  //["data-[selected=true]:bg-primary-50"]
};