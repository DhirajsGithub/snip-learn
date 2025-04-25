export const getProgressKey = (hobby: string, level: string)=>{
    return `PROGRESS_V2_${hobby}_${level}`
}

export const getLearningPathKey = (hobby: string, level: string)=>{
    return `LEARNING_PATH_V2_${hobby}_${level}`
}

export const getTechniqueContentKey = (hobby: string, level: string, techniqueId: string)=>{
    return `TECHNIQUE_CONTENT_V2_${hobby}_${level}_${techniqueId}`
}