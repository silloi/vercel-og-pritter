import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import Image from "next/image";

const formatterDate = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const formatterTime = new Intl.DateTimeFormat("ja-JP", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export const config = {
  runtime: "edge",
};

const profileUrl = "https://www.wiss.org/WISS2023/assets/logo/logo.png";
const logoUrl = "https://scrapbox.io/files/631b480d4c17b800224c2afa.svg";

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const message = searchParams.get("message").slice(0, 92);
  if (!message) {
    return new ImageResponse(<>{'Visit with "?message=Hello world!"'}</>, {
      width: 800,
      height: 400,
    });
  }
  const username = searchParams.get("username") || "WISS2023 参加者";
  const userid = searchParams.get("userid") || "@wiss2023";
  const date = new Date();
  const dateStr = formatterTime.format(date);
  const timeStr = formatterDate.format(date);
  const clientStr = "Pritter from Helpfeel";
  const datetimeStr = `${dateStr} · ${timeStr} · ${clientStr}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          padding: "1rem 2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={profileUrl}
              alt="profile"
              style={{ width: "4rem", height: "4rem", borderRadius: "50%" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "1.5rem" }}>{username}</span>
              <span style={{ fontSize: "1.2rem", color: "gray" }}>
                {userid}
              </span>
            </div>
          </div>
          <img
            src={logoUrl}
            alt="logoUrl"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
        <div style={{ padding: "2rem 0", fontSize: "2rem" }}>{message}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "1rem",
            color: "gray",
            gap: "0.2rem",
          }}
        >
          <span>{datetimeStr}</span>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
    }
  );
}
