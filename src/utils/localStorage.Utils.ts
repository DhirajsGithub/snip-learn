export const getProgressKey = (hobby: string, level: string)=>{
    return `PROGRESS_${hobby}_${level}`
}

export const getLearningPathKey = (hobby: string, level: string)=>{
    return `LEARNING_PATH_${hobby}_${level}`
}

export const getTechniqueContentKey = (hobby: string, level: string, techniqueId: string)=>{
    return `TECHNIQUE_CONTENT_${hobby}_${level}_${techniqueId}`
}