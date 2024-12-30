"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { Question } from "@/app/dashboard/my-quiz/[id]/page";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  questions: Question[];
}


export function AppSidebar({ questions, ...props }: AppSidebarProps) {
  const { setOpen } = useSidebar()

  return (
    <Sidebar
      className="[&>[data-sidebar=sidebar]]:flex-row group-data-[collapsible=offcanvas]:hidden sticky"
      variant="floating"
      {...props}
    >
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              Questions
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              {questions.map((data, index) => (
                <a
                  href={`#quizen-${index}`}
                  key={`sc-${index}`}
                  className="flex flex-col items-start gap-2 whitespace-nowrap p-4 text-sm leading-tight border rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mb-2"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>Question {index + 1}</span>{" "}
                  </div>
                  <span className="font-medium line-clamp-1 w-[260px] whitespace-break-spaces">{data.question}</span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
