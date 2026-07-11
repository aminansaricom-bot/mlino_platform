import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Every controller needs the authenticated user's id from req.user
// (set by JwtStrategy.validate). Centralizing it here removes the
// `@Req() req: any` + `req.user.userId` duplication that was repeated
// identically in 4 controllers.
export const CurrentUserId = createParamDecorator((_: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.userId;
});
