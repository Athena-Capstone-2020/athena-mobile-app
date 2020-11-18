export class Recipe{
    /**
     * @param {string} name 
     * @param {string} photoURI 
     * @param {string[]} ingredients 
     * @param {string[]} directions
     * @param {string} servingSize
     * @param {string} prepTime
     */
    constructor(name, photoURI, ingredients, directions, servingSize, prepTime){
        super()
        this.name = name
        this.photoURI = photoURI
        this.ingredients = ingredients
        this.directions = directions
        this.servingSize = servingSize
        this.prepTime = prepTime
    }
}