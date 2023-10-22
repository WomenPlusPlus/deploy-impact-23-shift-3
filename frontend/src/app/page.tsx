"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  router.replace("/login");

  return <p>...loading</p>;
}
