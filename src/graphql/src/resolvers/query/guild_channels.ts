import { container } from 'tsyringe';
import API from '@yuudachi/api';

export default (_: any, args: { guild_id: `${bigint}` }) => {
	const api = container.resolve(API);
	return api.guilds.getChannels(args.guild_id);
};
