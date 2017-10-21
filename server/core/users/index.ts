import { rolesSchema, IOmniUsersRolesModel } from './models/Roles';
import { usersSchema, IOmniUsersModel } from './models/Users';
import { usersLogsSchema, IOmniUsersLogsModel } from './models/UsersLogs';
import { model } from 'mongoose';

export const omniUsers = model<IOmniUsersModel>('OminUsers', usersSchema.schema);
export const omniUsersRoles = model<IOmniUsersRolesModel>('OminUsersRoles', rolesSchema.schema);
export const omniUsersLogs = model<IOmniUsersLogsModel>('OminUsersLogs', usersLogsSchema.schema);
