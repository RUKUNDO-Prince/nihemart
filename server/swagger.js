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
        description: "Register a new admin user",
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
                  password: {
                    type: "string",
                  },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Account Created Successfully",
          },
          400: {
            description: "Missing required fields",
          },
          409: {
            description: "Email is already in use",
          },
          500: {
            description: "Internal server error",
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
    // "/auth/signup": {
    //   post: {
    //     summary: "User signup",
    //     description: "Register a new user",
    //     requestBody: {
    //       required: true,
    //       content: {
    //         "application/json": {
    //           schema: {
    //             type: "object",
    //             properties: {
    //               name: {
    //                 type: "string",
    //               },
    //               email: {
    //                 type: "string",
    //                 format: "email",
    //               },
    //               password: {
    //                 type: "string",
    //               },
    //               phone: {
    //                 type: "string",
    //               },
    //             },
    //             required: ["name", "email", "password"],
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       201: {
    //         description: "Signup successful.",
    //       },
    //       400: {
    //         description: "All fields are compulsory.",
    //       },
    //       500: {
    //         description: "Internal Server Error",
    //       },
    //     },
    //   },
    // },
    "/user/signup": {
      post: {
        summary: "User signup",
        description: "Register a new user",
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
                  password: {
                    type: "string",
                  },
                  phone: {
                    type: "string",
                  },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Signup successful.",
          },
          400: {
            description: "All fields are compulsory.",
          },
          409: {
            description: "Email is already in use",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/user/login": {
      post: {
        summary: "User login",
        description: "Log in an existing user and get JWT token",
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
            description: "Login successful, JWT token generated",
          },
          401: {
            description: "Invalid email or password",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/product": {
      post: {
        summary: "Product registration",
        description: "Admin adding a product to the site",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                  quantity: {
                    type: "number",
                  },
                  category: {
                    type: "string",
                  },
                  photos: {
                    type: "array",
                    items: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
                required: [
                  "name",
                  "description",
                  "price",
                  "quantity",
                  "category",
                  "photos",
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product added successfully",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/product/{category}": {
      get: {
        summary: "Get products by category",
        description: "Get all products in a specific category",
        parameters: [
          {
            in: "path",
            name: "category",
            required: true,
            schema: {
              type: "string",
            },
            description: "Category of the products.",
          },
        ],
        responses: {
          200: {
            description: "Products retrieved successfully",
          },
          404: {
            description: "No products found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/product/{productId}/like": {
      post: {
        summary: "Like a product",
        description: "Like a product by its ID",
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the product to be liked.",
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
                  },
                  email: {
                    type: "string",
                    format: "email",
                  },
                  phoneNumber: {
                    type: "string",
                  },
                  city: {
                    type: "string",
                  },
                  destination: {
                    type: "string",
                  },
                  fee: {
                    type: "number",
                  },
                },
                required: [
                  "name",
                  "email",
                  "phoneNumber",
                  "city",
                  "destination",
                  "fee",
                ],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product liked successfully",
          },
          400: {
            description: "You have already liked this product",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/product/{productId/order": {
      post: {
        summary: "Order a product via WhatsApp",
        description: "Order a product via WhatsApp by its ID",
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the product to order.",
          },
        ],
        responses: {
          302: {
            description: "Redirect to WhatsApp",
            headers: {
              Location: {
                schema: {
                  type: "string",
                  format: "uri",
                },
                description: "URL to WhatsApp",
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/cart": {
      get: {
        summary: "Get user cart",
        description: "Retrieve the user's cart",
        responses: {
          200: {
            description: "Cart retrieved successfully",
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
        summary: "Add item to cart",
        description: "Add an item to the user's cart",
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the product to add to the cart.",
          },
        ],
        responses: {
          200: {
            description: "Product added to cart successfully",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/cart/delete/{itemId}": {
      delete: {
        summary: "Delete item from cart",
        description: "Delete an item from the user's cart",
        parameters: [
          {
            in: "path",
            name: "itemId",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the item to delete from the cart.",
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
            description: "Internal server error",
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
            description: "Message sent successfully",
          },
          400: {
            description: "Missing required fields",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/user/confirmation/{token}": {
      get: {
        summary: "Confirm email",
        description: "Confirm the user's email using a token",
        parameters: [
          {
            in: "path",
            name: "token",
            required: true,
            schema: {
              type: "string",
            },
            description: "Token to confirm the email.",
          },
        ],
        responses: {
          200: {
            description: "Email confirmed successfully",
          },
          400: {
            description: "Invalid token",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

module.exports = { swaggerDoc };
