import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const CustomerPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">

            {
                [1, 2, 3, 4, 5, 6].map((item) => (
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>

                        </CardFooter>
                        <CardAction>
                            <Button>customize</Button>
                            <Button>Order</Button>
                        </CardAction>
                    </Card>

                ))
            }

        </div>
    );
}

export default CustomerPage;
