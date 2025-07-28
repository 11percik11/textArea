export interface Cell 
{
  "id": number | null,
  "sequence": number,
  "title": string,
  "isTitleVisible": boolean,
  "type": string,
  "description": string,
  "images": any[],
  "files": any[]
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
          "images": any[],
          "files": any[]
        }[]
    }[],
  "parentCell": {
    "id": number,
    "title": string,
    "sequence": number
  }
}