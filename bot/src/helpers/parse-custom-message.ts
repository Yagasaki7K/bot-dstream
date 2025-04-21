/*
 * Create a custom html string to add custom attachments to the message
 */

const parseCustomMessage = (content: string) => {
    const emojiRegex = /<a?:(\w+):(\d+)>/g;

    return content.replace(emojiRegex, (match, name, id) => {
        const isAnimated = match.startsWith("<a:");
        const extension = isAnimated ? "gif" : "png";
        const emojiUrl = `https://cdn.discordapp.com/emojis/${id}.${extension}`;

        return `<img src="${emojiUrl}" alt=":${name}:" class="discord-emoji" width="20" height="20">`;
    });
};

export { parseCustomMessage };
