import { redirect } from "next/navigation";
import { CONFIG } from "@/lib/config";

export default function HomePage() {
  redirect(CONFIG.ROUTES.LOGIN);
}