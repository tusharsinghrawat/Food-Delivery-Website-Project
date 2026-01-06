// Food Delivery App Types (JS version using JSDoc)

/**
 * @typedef {'customer' | 'admin'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {string=} phone
 * @property {string=} address
 * @property {string=} avatar
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string[]} cuisine
 * @property {number} rating
 * @property {string} deliveryTime
 * @property {number} minOrder
 * @property {string} address
 * @property {boolean} isOpen
 */

/**
 * @typedef {Object} FoodItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {string} category
 * @property {string} restaurantId
 * @property {boolean} isVeg
 * @property {boolean} isAvailable
 * @property {number} rating
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {FoodItem} foodItem
 * @property {number} quantity
 */

/**
 * @typedef {'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'} OrderStatus
 * @typedef {'cod' | 'online'} PaymentMethod
 * @typedef {'pending' | 'completed' | 'failed'} PaymentStatus
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {number} totalAmount
 * @property {OrderStatus} status
 * @property {string} deliveryAddress
 * @property {PaymentMethod} paymentMethod
 * @property {PaymentStatus} paymentStatus
 * @property {string} createdAt
 * @property {string} restaurantId
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} image
 */

export {};
