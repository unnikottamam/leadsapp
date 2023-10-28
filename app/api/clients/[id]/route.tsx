import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clientSchema } from "../../../validationSchemas/clients";