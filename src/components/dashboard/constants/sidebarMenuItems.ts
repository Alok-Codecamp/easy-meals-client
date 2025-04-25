import { GiMeal } from "react-icons/gi";
import { BsCartCheckFill } from "react-icons/bs";
import { IconType } from "react-icons";

export type NavSubItem = {
    title: string;
    url: string;
};

export type NavMenuItem = {
    title: string;
    baseUrl: string;
    icon: IconType;
    isActive?: boolean;
    items: NavSubItem[];
};

export const CustomerNavMenuItem = [
    {
        title: "Select Meal Plan",
        baseUrl: "/customer",
        icon: GiMeal,
        isActive: true,
        items: [

            {
                title: "Set Preference",
                url: "#",
            },
        ],
    },
    {
        title: "Tracking Orders",
        baseUrl: "/dashboard/customer",
        icon: BsCartCheckFill,
        items: [
            {
                title: "Order Status",
                url: "track-orders",
            },


        ],
    },
    {
        title: "Profile",
        baseUrl: "/profile",
        icon: BsCartCheckFill,
        items: [
            {
                title: "Edit Profile",
                url: "customer",
            },

        ],
    },


]

// meal provider menu item 

export const providerNavMenuItem = [
    {
        title: "Manage Menus",
        baseUrl: "/dashboard/provider",
        icon: GiMeal,
        isActive: true,
        items: [
            {
                title: 'Create Meal',
                url: 'create-meal'
            },
            {
                title: 'Update Meal',
                url: 'update-meal'
            }
        ],
    },
    {
        title: "Manage Orders",
        baseUrl: "/dashboard/provider",
        icon: BsCartCheckFill,
        items: [
            {
                title: "Order Response",
                url: "responses",
            },


        ]
    },
    {
        title: "Manage Profile",
        baseUrl: "/profile",
        icon: BsCartCheckFill,
        items: [
            {
                title: "Profile",
                url: "provider",
            },
            // {
            //     title: "Change Password",
            //     url: "change-password",
            // }


        ]
    },
] 