// import { FormControl, FormLabel, Input } from "@chakra-ui/react";
// import {
//   CardElement,
//   Elements,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// function CheckoutForm() {
//   const stripe_publc_key =
//     "pk_test_51PxQbpSGFWbieUgVPuqignSI6psmXOviW17Ou1WODZx17x4fyRFl3mUswT7wQUqYHEXyGFGUV6TBpZjJhCltiOAH00ZWacc3v6";
//   const stripe_secret_key =
//     "sk_test_51PxQbpSGFWbieUgVvAR8HfNbjz1vt9p0R35BrnkShifgIswHZHN8DF7INhMh9OQeCZY7XrKFCabx9I7ViA0luTcL00G7qVbaQy";

//   const stripePromise = loadStripe(stripe_publc_key);

//   const stripe = useStripe();
//   //   const element = useElements();

//   const appearance = {
//     theme: "stripe" as "stripe", // Correct theme type
//     variables: {
//       colorPrimary: "#0570de",
//       colorBackground: "#ffffff",
//       colorText: "#30313d",
//       colorDanger: "#df1b41",
//       fontFamily: "Ideal Sans, system-ui, sans-serif",
//       spacingUnit: "2px",
//       borderRadius: "4px",
//     },
//   };

//   const elements = stripe?.elements({
//     clientSecret: stripe_secret_key,
//     appearance,
//   });

//   const cardElement = elements?.create("card", {
//     style: {
//       base: {
//         // Add any custom styles here
//         fontSize: "16px",
//         color: "#30313d",
//         fontFamily: "Ideal Sans, system-ui, sans-serif",
//         padding: "10px",
//       },
//     },
//   });

//   // Mount the Card Element to an HTML element
//   const cardContainer: HTMLElement | null =
//     document.getElementById("card-element"); // Ensure you have an HTML element with this ID
//   if (cardContainer !== null) {
//     cardElement?.mount(cardContainer);
//   }

//   //   const cardElementOptions = {
//   //     style: {
//   //       base: {
//   //         color: "#32325d",
//   //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//   //         fontSmoothing: "antialiased",
//   //         fontSize: "16px",
//   //         "::placeholder": {
//   //           color: "#aab7c4",
//   //         },
//   //       },
//   //       invalid: {
//   //         color: "#eb1c26",
//   //         iconColor: "#eb1c26",
//   //       },
//   //     },
//   //     hidePostalCode: true,
//   //   };

//   return (
//     <>
//       <FormControl>
//         <FormLabel>Email address</FormLabel>
//         <Input type="email" />
//       </FormControl>
//       <FormControl my="5">
//         <div id="card-element"></div>

//         {/* <CardElement /> */}
//       </FormControl>
//     </>
//   );
// }

// export default CheckoutForm;
