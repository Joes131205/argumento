import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Argumento API",
            version: "1.0.0",
            description: "API docs for Argumento",
        },
        servers: [
            {
                url: "/api",
                description: "Base path (e.g url/api)",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Server error" },
                        error: {
                            type: "object",
                            nullable: true,
                            additionalProperties: true,
                        },
                    },
                },
                TokenResponse: {
                    type: "object",
                    required: ["success", "message", "token"],
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                        token: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1Ni...",
                        },
                    },
                },
                SuccessMessageResponse: {
                    type: "object",
                    required: ["success", "message"],
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                    },
                },
                RegisterRequest: {
                    type: "object",
                    required: ["username", "password", "email"],
                    properties: {
                        username: {
                            type: "string",
                            minLength: 3,
                            example: "johndoe",
                        },
                        password: {
                            type: "string",
                            minLength: 8,
                            example: "password123",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "johndoe@gmail.com",
                        },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", example: "johndoe" },
                        password: { type: "string", example: "password123" },
                    },
                },
                EmailRequest: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "johndoe@gmail.com",
                        },
                    },
                },
                ResetPasswordRequest: {
                    type: "object",
                    required: ["newPassword"],
                    properties: {
                        newPassword: {
                            type: "string",
                            minLength: 8,
                            example: "password123",
                        },
                    },
                },
                Post: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6817d31d03ac52b14ebbb001",
                        },
                        headline: { type: "string" },
                        content: { type: "string" },
                        type: { type: "string", enum: ["slop", "safe"] },
                        category: {
                            type: "string",
                            enum: [
                                "logical_fallacies",
                                "cognitive_biases",
                                "media_manipulation",
                                "ai_hallucinations",
                                "safe",
                            ],
                        },
                        reasons: {
                            type: "array",
                            items: { type: "string" },
                        },
                        origin: { type: "string", enum: ["human", "ai"] },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                UserStat: {
                    type: "object",
                    properties: {
                        stat_id: { type: "string" },
                        name: { type: "string" },
                        correct: { type: "number" },
                        total: { type: "number" },
                    },
                },
                CampaignProgress: {
                    type: "object",
                    properties: {
                        campaign_id: { type: "string" },
                        isCompleted: { type: "boolean" },
                        levelsCompleted: {
                            type: "array",
                            items: { type: "string" },
                        },
                    },
                },
                UserInventory: {
                    type: "object",
                    properties: {
                        themes: { type: "array", items: { type: "string" } },
                        consumables: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    itemId: { type: "string" },
                                    amount: { type: "number" },
                                },
                            },
                        },
                    },
                },
                UserPublic: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        username: { type: "string" },
                        email: { type: "string", format: "email" },
                        isVerified: { type: "boolean" },
                        totalExp: { type: "number" },
                        totalCoins: { type: "number" },
                        currentStreak: { type: "number" },
                        bestStreak: { type: "number" },
                        postsProcessed: { type: "number" },
                        postsCorrect: { type: "number" },
                        postsHistory: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    post_id: { type: "string" },
                                    is_correct: { type: "boolean" },
                                },
                            },
                        },
                        stats: {
                            type: "array",
                            items: { $ref: "#/components/schemas/UserStat" },
                        },
                        campaign_progress: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/CampaignProgress",
                            },
                        },
                        activeTheme: { type: "string" },
                        inventory: {
                            $ref: "#/components/schemas/UserInventory",
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                AuthenticatedUserResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        user: { $ref: "#/components/schemas/UserPublic" },
                    },
                },
                JudgeRequest: {
                    type: "object",
                    required: [
                        "headline",
                        "content",
                        "slop_reasons",
                        "user_reason",
                    ],
                    properties: {
                        headline: { type: "string" },
                        content: { type: "string" },
                        slop_reasons: {
                            type: "array",
                            items: { type: "string" },
                        },
                        user_reason: { type: "string" },
                    },
                },
                JudgeResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                        response: {
                            type: "object",
                            properties: {
                                is_correct: { type: "boolean" },
                                feedback_message: { type: "string" },
                            },
                        },
                    },
                },
                ShiftGenerateRequest: {
                    type: "object",
                    required: ["postLength", "types"],
                    properties: {
                        postLength: { type: "number", example: 10 },
                        types: { type: "array", items: { type: "string" } },
                    },
                },
                ShiftCompleteRequest: {
                    type: "object",
                    required: ["history"],
                    properties: {
                        history: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["post_id", "is_correct"],
                                properties: {
                                    post_id: { type: "string" },
                                    is_correct: { type: "boolean" },
                                },
                            },
                        },
                    },
                },
                PostsResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                        posts: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Post" },
                        },
                    },
                },
                CompleteShiftResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                        data: { $ref: "#/components/schemas/UserPublic" },
                    },
                },
                LeaderboardResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                        type: { type: "string" },
                        data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/UserPublic" },
                        },
                    },
                },
                CampaignResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        campaign: {
                            type: "object",
                            additionalProperties: true,
                        },
                    },
                },
                CampaignLevelResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Success" },
                        part: {
                            type: "object",
                            additionalProperties: true,
                        },
                    },
                },
                SinglePostResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        post: { $ref: "#/components/schemas/Post" },
                    },
                },
                SingleUserResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        user: { $ref: "#/components/schemas/UserPublic" },
                    },
                },
                EquipThemeRequest: {
                    type: "object",
                    required: ["itemId"],
                    properties: {
                        itemId: { type: "string", example: "theme_green" },
                    },
                },
                BuyShopItemRequest: {
                    type: "object",
                    required: ["type", "itemId"],
                    properties: {
                        type: { type: "string", example: "themes" },
                        itemId: { type: "string", example: "theme_green" },
                    },
                },
                ShopResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        shop: {
                            type: "object",
                            additionalProperties: true,
                        },
                    },
                },
                FeedbackRequest: {
                    type: "object",
                    required: [
                        "description",
                        "expectation",
                        "favoritePart",
                        "frustrated",
                        "clarity",
                        "playAgainTomorrow",
                        "improvements",
                        "learnedSomething",
                        "changesSocialMedia",
                    ],
                    properties: {
                        description: { type: "string" },
                        expectation: {
                            type: "string",
                            enum: ["better", "same", "worse"],
                        },
                        favoritePart: { type: "string" },
                        frustrated: { type: "string" },
                        clarity: { type: "number", minimum: 1, maximum: 4 },
                        playAgainTomorrow: {
                            type: "number",
                            minimum: 1,
                            maximum: 5,
                        },
                        improvements: { type: "string" },
                        learnedSomething: {
                            type: "string",
                            enum: [
                                "yes_lot",
                                "yes_little",
                                "not_really",
                                "already_knew",
                            ],
                        },
                        changesSocialMedia: {
                            type: "string",
                            enum: ["yes", "maybe", "probably_not", "no"],
                        },
                        anythingElse: { type: "string", nullable: true },
                    },
                },
                FeedbackResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: {
                            type: "string",
                            example: "Thank you for your feedback!",
                        },
                        feedback: {
                            type: "object",
                            additionalProperties: true,
                        },
                    },
                },
                FeedbackAnalyticsResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        analytics: {
                            type: "object",
                            properties: {
                                totalResponses: { type: "number" },
                                avgRetention: { type: "string" },
                                avgClarity: { type: "string" },
                                expectations: {
                                    type: "object",
                                    properties: {
                                        better: { type: "number" },
                                        same: { type: "number" },
                                        worse: { type: "number" },
                                    },
                                },
                                learnedDistribution: {
                                    type: "object",
                                    properties: {
                                        yes_lot: { type: "number" },
                                        yes_little: { type: "number" },
                                        not_really: { type: "number" },
                                        already_knew: { type: "number" },
                                    },
                                },
                                changeBehavior: {
                                    type: "object",
                                    properties: {
                                        yes: { type: "number" },
                                        maybe: { type: "number" },
                                        probably_not: { type: "number" },
                                        no: { type: "number" },
                                    },
                                },
                            },
                        },
                        allFeedback: {
                            type: "array",
                            items: {
                                type: "object",
                                additionalProperties: true,
                            },
                        },
                    },
                },
            },
        },
        paths: {
            "/": {
                get: {
                    tags: ["System"],
                    summary: "Simple API Health Check",
                    responses: {
                        "200": {
                            description: "Server is healthy",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            status: {
                                                type: "string",
                                                example: "OK",
                                            },
                                            message: {
                                                type: "string",
                                                example: "Server is healthy",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/auth/login": {
                post: {
                    tags: ["Auth"],
                    summary: "Login user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/LoginRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Login successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/TokenResponse",
                                    },
                                },
                            },
                        },
                        "400": { description: "Invalid credentials" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/auth/register": {
                post: {
                    tags: ["Auth"],
                    summary: "Register user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/RegisterRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Registration successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/TokenResponse",
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Username or email already exists",
                        },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/auth": {
                get: {
                    tags: ["Auth"],
                    summary: "Get current authenticated user",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "Current user returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/AuthenticatedUserResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
                delete: {
                    tags: ["Auth"],
                    summary: "Delete current authenticated account",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "Account deleted",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/auth/verify": {
                post: {
                    tags: ["Auth"],
                    summary: "Send verification email",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EmailRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Verification email sent",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "404": { description: "User not found" },
                        "429": { description: "Request cooldown not elapsed" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/auth/verify/{id}": {
                put: {
                    tags: ["Auth"],
                    summary: "Verify email by token id",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Email verified",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized or token expired" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/auth/reset": {
                post: {
                    tags: ["Auth"],
                    summary: "Generate reset password token",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EmailRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Reset token generated",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/auth/reset/{id}": {
                put: {
                    tags: ["Auth"],
                    summary: "Reset password by token id",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ResetPasswordRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Password reset successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized or token expired" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/judge": {
                post: {
                    tags: ["Judge"],
                    summary: "Submit a content to be judged by AI",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/JudgeRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Processed",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/JudgeResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/shifts/complete": {
                put: {
                    tags: ["Shifts"],
                    summary: "Complete the shift",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ShiftCompleteRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Shift completed",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/CompleteShiftResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/shifts/generate": {
                post: {
                    tags: ["Shifts"],
                    summary: "Generate daily shift",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ShiftGenerateRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Daily shift generated",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/PostsResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/shifts/practice": {
                post: {
                    tags: ["Shifts"],
                    summary: "Generate practice shifts",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ShiftGenerateRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Practice shifts generated",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/PostsResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/leaderboard/{type}": {
                get: {
                    tags: ["Leaderboard"],
                    summary: "Get leaderboard by type",
                    parameters: [
                        {
                            name: "type",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Leaderboard returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LeaderboardResponse",
                                    },
                                },
                            },
                        },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/campaign": {
                get: {
                    tags: ["Campaign"],
                    summary: "Get campaign state",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "Campaign returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/CampaignResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/campaign/{level}/{id}": {
                get: {
                    tags: ["Campaign"],
                    summary: "Get campaign level content",
                    parameters: [
                        {
                            name: "level",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Campaign level returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/CampaignLevelResponse",
                                    },
                                },
                            },
                        },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/campaign/complete/{level}/{id}": {
                post: {
                    tags: ["Campaign"],
                    summary: "Complete campaign level",
                    security: [{ BearerAuth: [] }],
                    parameters: [
                        {
                            name: "level",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Campaign level completed",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "404": { description: "Campaign not found" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/posts/{postId}": {
                get: {
                    tags: ["Posts"],
                    summary: "Get post by id",
                    parameters: [
                        {
                            name: "postId",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Post returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SinglePostResponse",
                                    },
                                },
                            },
                        },
                        "404": { description: "Post not found" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/users/{userId}": {
                get: {
                    tags: ["Users"],
                    summary: "Get public user by id",
                    parameters: [
                        {
                            name: "userId",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "User returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SingleUserResponse",
                                    },
                                },
                            },
                        },
                        "404": { description: "User not found" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/users/theme": {
                put: {
                    tags: ["Users"],
                    summary: "Equip color theme",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EquipThemeRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Theme updated",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "404": { description: "User or theme not found" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/users/streak": {
                put: {
                    tags: ["Users"],
                    summary: "Check and update user streak",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "Streak refreshed",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "404": { description: "User not found" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/users/cron/reset-streaks": {
                post: {
                    tags: ["Users"],
                    summary: "Reset streaks (CRON job endpoint)",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "Streak reset task executed",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean",
                                                example: true,
                                            },
                                            message: {
                                                type: "string",
                                                example: "Reset 10 streaks",
                                            },
                                            resetCount: {
                                                type: "number",
                                                example: 10,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/shops": {
                get: {
                    tags: ["Shop"],
                    summary: "Get shop items & inventory",
                    responses: {
                        "200": {
                            description: "Shop & inventory returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/ShopResponse",
                                    },
                                },
                            },
                        },
                        "500": { description: "Server error" },
                    },
                },
                put: {
                    tags: ["Shop"],
                    summary: "Buy shop item",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/BuyShopItemRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Purchase successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/SuccessMessageResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "400": { description: "Insufficient coins" },
                        "404": { description: "User or item not found" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/feedback": {
                post: {
                    tags: ["Feedback (Post-Survey)"],
                    summary: "Submit feedback",
                    security: [{ BearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/FeedbackRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        "201": {
                            description: "Feedback submitted",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/FeedbackResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
            "/feedback/analytics": {
                get: {
                    tags: ["Feedback (Post-Survey)"],
                    summary: "Get feedback analytics",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "Feedback analytics returned",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/FeedbackAnalyticsResponse",
                                    },
                                },
                            },
                        },
                        "401": { description: "Unauthorized" },
                        "500": { description: "Server error" },
                    },
                },
            },
        },
    },
    apis: [],
};

export const openApiSpec = swaggerJSDoc(swaggerOptions);
