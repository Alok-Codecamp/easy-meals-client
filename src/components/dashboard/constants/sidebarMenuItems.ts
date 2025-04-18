import { GiMeal } from "react-icons/gi";
import { BsCartCheckFill } from "react-icons/bs";
import { PiBowlFoodFill } from "react-icons/pi";
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
                title: "Daily Plan",
                url: "daily-meal-plan",
            },
            {
                title: "Weekly-Plan",
                url: "weekly-meal-plan",
            },
            {
                title: "Monthly Plan",
                url: "monthly-meal-plan",
            },
        ],
    },
    {
        title: "Tracking Orders",
        baseUrl: "/customer",
        icon: BsCartCheckFill,
        items: [
            {
                title: "All Orders",
                url: "#",
            },
            {
                title: "Order Placed",
                url: "#",
            },
            {
                title: "Preparing Your Meal",
                url: "#",
            },
            {
                title: "Ready for Pickup",
                url: "#"
            }
        ],
    },
    {
        title: "Manage Preferences",
        baseUrl: "/customer",
        icon: PiBowlFoodFill,
        items: [

            {
                title: "Clean Meals",
                url: "clean-meals",
            },
            {
                title: "Paleo",
                url: "paleo",
            },
            {
                title: "Keto Meals",
                url: "keto-meals",
            },
            {
                title: "Plant Based Meals",
                url: "plant-based-meals",
            },
            {
                title: "GLP-1 Meals",
                url: "glp-1-Meals"
            },
            {
                title: "Meal Prep",
                url: "browse-all-meal-prep"
            }
        ],
    },

]

// meal provider menu item 

export const providerNavMenuItem = [
    {
        title: "Manage Menus",
        baseUrl: "/provider",
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
        baseUrl: "/provider",
        icon: BsCartCheckFill,
        items: [
            {
                title: "All Orders",
                url: "all-orders",
            },
            {
                title: "Confirm Orders",
                url: "confirm-orders",
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
            // },


        ]
    },
] 