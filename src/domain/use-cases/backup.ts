import { IUseCase } from "@domain/interfaces/use-case";

class BackupUseCase implements IUseCase<any, any> {
    handle: (request?: any) => any;
}

export default BackupUseCase;