import { LucideIcon } from "lucide-react"

export type TNavMain = {
    title: string
    url: string
    icon?: LucideIcon | any
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}[]