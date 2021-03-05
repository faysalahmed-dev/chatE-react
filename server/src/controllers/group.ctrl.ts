import url from 'url';
import _ from 'lodash';
import httpError from 'http-errors';
import Group from '@/model/group';
import { UserBaseI } from '@/model/user/user.interface';
import { GroupCreateBody } from '@/model/group/group.interface';
import catchError from '@/utils/catchError';
import sendResponse from '@/utils/sendResponse';
import { IReq } from '@/ts/interface';
import { Types } from 'mongoose';

export const getAllGroup = catchError(async (req: IReq<{}, UserBaseI>, res) => {
    const { page, limit } = req.query;
    const skip =
        page && parseInt(page as string) ? parseInt(page as string) * 15 : 0;

    let buildQuery: any = {};

    if (req.user) {
        buildQuery = {
            fans: { $nin: req.user.id },
        };
    }
    const group = await Group.find(buildQuery)
        .limit(parseInt(limit as string) ? parseInt(limit as string) : 15)
        .skip(skip)
        .populate('admin', 'id name username')
        .populate({
            path: 'fans',
            select: 'id name username avater',
            options: { limit: 5 },
        });

    const totalDoc = await Group.countDocuments();
    sendResponse(res, 200, {
        data: group,
        totalClub: totalDoc,
        totalResult: group.length,
        skiped: skip,
    });
});
export const getGroup = catchError(async (req, res, next) => {
    const { groupSlug } = req.params;
    if (!groupSlug) return next(httpError(400, 'invalid group query'));

    const group = await Group.findOne({ slug: groupSlug }).populate(
        'admin',
        'id name username'
    );
    if (!group) return next(httpError(404, 'group not found'));
    sendResponse(res, 200, { data: group });
});

export const getJoinedGroups = catchError(
    async (req: IReq<{}, UserBaseI>, res) => {
        const { page } = req.query;
        const limit = 15;
        const skip =
            page && parseInt(page as string)
                ? parseInt(page as string) * 15
                : 0;

        const groups = await Group.find({ fans: req.user!.id })
            .limit(limit)
            .skip(skip);

        const totalDoc = await Group.count({ fans: req.user!.id });

        sendResponse(res, 200, {
            data: groups,
            totalClub: totalDoc,
            totalResult: groups.length,
            skiped: skip,
        });
    }
);

export const favoriteGroups = catchError(
    async (req: IReq<GroupCreateBody, UserBaseI>, res, next) => {
        const { page } = req.query;
        const limit = 15;
        const skip =
            page && parseInt(page as string)
                ? parseInt(page as string) * 15
                : 0;

        const favoriteGroups = await req
            .user!.populate({
                path: 'favoriteGroups',
                options: {
                    limit,
                    skip,
                },
            })
            .execPopulate();
        return sendResponse(res, 200, {
            data: favoriteGroups.favoriteGroups,
            totalClub: req.user!.favoriteGroups.length,
            totalResult: favoriteGroups.favoriteGroups.length,
            skiped: skip,
        });
    }
);

export const createGroup = catchError(
    async (req: IReq<GroupCreateBody, UserBaseI>, res, next) => {
        const clubObj = _.pick(req.body, [
            'groupname',
            'country',
            'location',
            'groupType',
        ]);

        const domain = url.format({
            protocol: req.protocol,
            host: req.get('host'),
        });

        const newGroup = await Group.create({
            groupType: ['public', 'private'].includes(clubObj.groupType)
                ? clubObj.groupType
                : 'private',
            groupname: clubObj.groupname,
            location: `${clubObj.location}, ${clubObj.country}`,
            image: `${domain}/${req.file.filename}`,
            admin: req.user!.id,
        });

        const newGroupObj = await newGroup
            .populate('admin', 'name username avater')
            .execPopulate();

        sendResponse(res, 201, { data: newGroupObj });
    }
);

export const groupBaseCtrl = catchError(
    async (req: IReq<{}, UserBaseI>, res, next) => {
        const { groupId } = req.params;

        if (!Types.ObjectId.isValid(groupId))
            return next(httpError(403, 'invalid group query'));

        const group = await Group.findById(groupId);
        if (!group) return next(httpError(403, 'group does not exits'));
        req.groups = group;
        next();
    }
);

export const joinGroup = catchError(
    async (req: IReq<{}, UserBaseI>, res, next) => {
        if (req.groups!.fans.includes(req.user!.id)) {
            return next(httpError(403, 'your already joined this group'));
        }
        req.groups!.fans.push(req.user!.id);
        await req.groups!.save();

        sendResponse(res, 200, {
            data: { message: 'successfully join group' },
        });
    }
);

export const leaveGroup = catchError(
    async (req: IReq<{}, UserBaseI>, res, next) => {
        const index = req.groups!.fans.findIndex(
            value => value.toString() === req.user!.id.toString()
        );
        if (index !== -1) {
            req.groups!.fans.splice(index, 1);
            await req.groups!.save();
            sendResponse(res, 200, {
                data: { message: 'successfully leave group' },
            });
        } else {
            sendResponse(res, 403, {
                data: { message: 'could not find user' },
            });
        }
    }
);

export const MarkGroupAsfavorite = catchError(
    async (req: IReq<{}, UserBaseI>, res, next) => {
        const { groupId } = req.params;

        //check user is joined this group
        if (!req.groups!.fans.includes(req.user!.id)) {
            return next(httpError(403, 'your are not joined this group'));
        }

        if (req.user!.favoriteGroups.includes(groupId)) {
            return next(httpError(403, 'already mark the group as favorite'));
        }
        req.user!.favoriteGroups.push(groupId);
        await req.user!.save();

        sendResponse(res, 200, {
            data: { message: 'successfully added to favorite list' },
        });
    }
);

export const unMarkGroupAsfavorite = catchError(
    async (req: IReq<{}, UserBaseI>, res, next) => {
        const { groupId } = req.params;

        if (!req.user!.favoriteGroups.includes(groupId)) {
            return next(httpError(403, 'group is not mark as favorite'));
        }

        const index = _.findIndex(req.user!.favoriteGroups, groupId);
        if (index !== -1) {
            req.user!.favoriteGroups.splice(index, 1);
            await req.user!.save();
            sendResponse(res, 200, {
                data: {
                    message: 'successfully remove group from favorite list',
                },
            });
        }
    }
);
