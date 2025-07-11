import { Context as HonoContext } from "hono";
import { Env } from "@/index";

export type Context = HonoContext<{ Bindings: Env }>;
