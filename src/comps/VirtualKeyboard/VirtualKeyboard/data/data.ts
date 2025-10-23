import {type KeyboardType } from '../types';

export const keyboardData: Record<KeyboardType, string[][]> = {
  rus: [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'BACKSPACE'],
    ['NUM', 'SPACE', 'LANG'],
  ],
  eng: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE'],
    ['NUM', 'SPACE', 'LANG'],
  ],
  num: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['?', '!', '$', '#', '_', '@', ';', ':','[', ']'],
    [',', '.', '*', '\\', '=', '-', '+', '(', ')'],
    ['NUM', 'SPACE', 'BACKSPACE'],
  ],
};
