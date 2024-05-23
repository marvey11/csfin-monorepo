import { SecurityData } from "../../types";

type CreateSecurityDto = SecurityData;

type UpdateSecurityDto = Partial<CreateSecurityDto>;

export type { CreateSecurityDto, UpdateSecurityDto };
