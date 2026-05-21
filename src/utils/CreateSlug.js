const createSlug = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
};

export default createSlug;