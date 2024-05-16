const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Backend API",
    description: "API documentation for the backend of the nihe mart",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/account": {
      post: {
        summary: "Admin registration",
        description: "Register a new user with email confirmation",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                  password: {
                    type: "string",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "User registered successfully. Please check your email for confirmation.",
          },
          400: {
            description: "Email already registered or missing fields.",
          },
          500: {
            description: "Internal server error during registration.",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Admin login",
        description: "Log in an existing admin and get JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                  password: {
                    type: "string",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "JWT token generated successfully.",
          },
          401: {
            description:
              "Invalid email, email not confirmed, or invalid password.",
          },
          500: {
            description: "Internal server error during login.",
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        summary: "Admin logout",
        description: "Log out of the admin",
        responses: {
          200: {
            description: "User logout successful",
          },
          401: {
            description: "Invalid session.",
          },
          500: {
            description: "Internal server error during logout.",
          },
        },
      },
    },
    "/product": {
      post: {
        summary: "product registration",
        description: "Admin adding a product to the site",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    required: true,
                  },
                  description: {
                    type: "string",
                    required: true,
                  },
                  price: {
                    type: "number",
                    required: true,
                  },
                  quantity: {
                    type: "number",
                    required: true,
                  },
                  photos: [
                    {
                      type: "string",
                    },
                  ],
                  category: {
                    type: String,
                    required: true,
                  },
                },
                required: ["photos", "category"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product added successfully",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/cart": {
      get: {
        summary: "User cart",
        description: "Cart containing items user has liked",
        responses: {
          200: {
            description: "Cart is generated",
          },
          404: {
            description: "Cart not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/cart/{productId}": {
      post: {
        summary: "Add item to the cart",
        description: "Adding an item to the cart",
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the product to be added to the cart.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    required: true,
                  },
                  price: {
                    type: "number",
                    required: true,
                  },
                  quantity: {
                    type: "number",
                    required: true,
                  },
                },
                required: ["name", "price"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product added to your cart successfully",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error.",
          },
        },
      },
    },
    "/cart/delete/{productId}": {
      delete: {
        summary: "Delete item from the cart",
        description: "Deleting an item from the cart",
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the product to be deleted from the cart.",
          },
        ],
        responses: {
          200: {
            description: "Item deleted successfully",
          },
          404: {
            description: "Item not found in cart",
          },
          500: {
            description: "Internal server error.",
          },
        },
      },
    },

    "/contact": {
      post: {
        summary: "Submit contact form",
        description: "Submit a contact form with name, email, and message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                    format: "email",
                  },
                  message: {
                    type: "string",
                  },
                },
                required: ["name", "email", "message"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Contact form submitted successfully.",
          },
          400: {
            description: "Missing fields in the contact form.",
          },
          500: {
            description:
              "Internal server error during contact form submission.",
          },
        },
      },
    },
    //     "/contact/{id}": {
    //       delete: {
    //         summary: "Delete contact query",
    //         description: "Delete a contact query by ID",
    //         parameters: [
    //           {
    //             in: "path",
    //             name: "id",
    //             schema: {
    //               type: "string",
    //             },
    //             required: true,
    //             description: "ID of the contact query to be deleted.",
    //           },
    //         ],
    //         responses: {
    //           200: {
    //             description: "Contact query deleted successfully.",
    //           },
    //           404: {
    //             description: "Contact query not found.",
    //           },
    //           500: {
    //             description: "Internal server error during contact query deletion.",
    //           },
    //         },
    //       },
    //     },
    //     "/contact/{id}/reply": {
    //       post: {
    //         summary: "Reply to contact query",
    //         description: "Reply to a contact query by ID",
    //         parameters: [
    //           {
    //             in: "path",
    //             name: "id",
    //             schema: {
    //               type: "string",
    //             },
    //             required: true,
    //             description: "ID of the contact query to be replied to.",
    //           },
    //         ],
    //         requestBody: {
    //           required: true,
    //           content: {
    //             "application/json": {
    //               schema: {
    //                 type: "object",
    //                 properties: {
    //                   reply: {
    //                     type: "string",
    //                   },
    //                 },
    //                 required: ["reply"],
    //               },
    //             },
    //           },
    //         },
    //         responses: {
    //           200: {
    //             description: "Reply sent successfully.",
    //           },
    //           404: {
    //             description: "Contact query not found.",
    //           },
    //           500: {
    //             description: "Internal server error during reply to contact query.",
    //           },
    //         },
    //       },
    //     },
  },
};

module.exports = { swaggerDoc };
