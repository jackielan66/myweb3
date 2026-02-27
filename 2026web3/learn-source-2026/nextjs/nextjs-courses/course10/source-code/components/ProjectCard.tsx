'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectCard() {
  return (
    <Card className="w-[350px] mt-8">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        content card
      </CardContent>
      <CardFooter>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
