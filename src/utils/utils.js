export const resolveRatingColor = (rating) => {
    if (rating > 7) return 'green';
    if (rating > 5) return 'yellow';
    return 'red';
};