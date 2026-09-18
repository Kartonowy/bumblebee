export function load({ locals }) {
    const logged = locals.user;

    return { 
        logged: !!logged
    }
}