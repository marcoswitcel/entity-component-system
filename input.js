const registeredKeys = Object.create(null);

/**
 * P objeto Input serve como API interface
 */
const Input = Object.create(null);

/**
 * @param String key
 * @return void 
 */
Input.setKeyIsPressedListenner = function setKeyIsPressedListenner(key) {

    /**
     * Inicializa o registro da chave no objeto de controle
     */
    registeredKeys[key] = false;

    window.addEventListener('keydown', event => {
        if (event.key === key) {
            registeredKeys[key] = true;
        }
    });

    window.addEventListener('keyup', event => {
        if (event.key === key) {
            registeredKeys[key] = false;
        }
    });
};

/**
 * @param String key
 * @return Boolean 
 */
Input.isKeyPressed = function isKeyPressed(key) {
    return registeredKeys[key];
};

Input.areBothKeysPressed = function areBothKeysPressed(key01, key02) {
    return registeredKeys[key01] && registeredKeys[key02];
};

/**
 * Exporta a API
 */