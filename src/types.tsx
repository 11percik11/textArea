export interface Cell 
{
  "id": number | null,
  "sequence": number,
  "title": string,
  "isTitleVisible": boolean,
  "type": string,
  "description": string,
  "images": any[],
  "files": FileType[]
}

export interface FileType{
  title: string,
  type: string,
  src?: Blob
}

export interface ImageType{
  title: string,
  type: string,
  src?: Blob
}

export interface Spreadsheet
{
  "id": number | null,
  "title": string,
  "rows": 
    {
      "id": number | null,
      "title": string,
      "color": string,
      "sequence": number,
      "isTimeScale": boolean,
      "cells":
        {
          "id": number | null,
          "sequence": number,
          "title": string,
          "isTitleVisible": boolean,
          "type": string,
          "description": string,
          "images": ImageType[],
          "files": FileType[]
        }[]
    }[],
  "parentCell": {
    "id": number,
    "title": string,
    "sequence": number
  }
}