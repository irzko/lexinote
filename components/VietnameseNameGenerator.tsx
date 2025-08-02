"use client";

import {
  lastName,
  femaleMiddleName,
  maleMiddleName,
  femaleFirstName,
  maleFirstName,
} from "@/lib/vietnameseNames";
import { useState, useCallback } from "react";

const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export default function VietnameseNameGenerator() {
  const [name, setName] = useState<string>("");
  const [defaultLastName, setDefaulLastName] = useState<string>("");
  const [defaultFirstName, setDefaulFirstName] = useState<string>("");
  const [gender, setGender] = useState<string>("female");
  const [length, setLength] = useState<number>(3);

  const generateName = useCallback(() => {
    const fullName = [];
    fullName.push(defaultLastName || getRandomElement(lastName));
    if (length > 2)
      for (let i = 0; i < length - 2; i++) {
        fullName.push(
          gender === "female"
            ? getRandomElement(femaleMiddleName)
            : getRandomElement(maleMiddleName),
        );
      }

    fullName.push(
      defaultFirstName ||
        (gender === "female"
          ? getRandomElement(femaleFirstName)
          : getRandomElement(maleFirstName)),
    );

    setName(fullName.join(" "));
  }, [gender, length, defaultLastName, defaultFirstName]);
  return (
    <div className="flex flex-col gap-4 justify-center max-w-md p-4">
      <p>Độ dài: {length}</p>
      <input
        type="range"
        min="2"
        max="7"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />

      <select
        className="h-12 bg-gray-100 px-2 rounded-xl"
        value={gender}
        onChange={(e) => {
          setDefaulFirstName("");
          setGender(e.target.value);
        }}
      >
        <option value="female">Nữ</option>
        <option value="male">Nam</option>
      </select>

      <select
        className="h-12 bg-gray-100 px-2 rounded-xl"
        value={defaultLastName}
        onChange={(e) => setDefaulLastName(e.target.value)}
      >
        <option value="">(Không có)</option>
        {lastName.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        className="h-12 bg-gray-100 px-2 rounded-xl"
        value={defaultFirstName}
        onChange={(e) => setDefaulFirstName(e.target.value)}
      >
        <option value="">(Không có)</option>
        {gender === "female"
          ? femaleFirstName.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))
          : maleFirstName.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
      </select>

      <p className="text-5xl px-4 border flex justify-center items-center font-semibold rounded-xl h-48">
        {name}
      </p>
      <button
        className="bg-blue-500 text-white w-full font-semibold rounded-xl h-12"
        onClick={() => generateName()}
      >
        Tạo
      </button>
    </div>
  );
}
