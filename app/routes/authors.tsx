import React from "react";
import { MainLayout } from "~/layouts/main";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
