import fs from 'fs/promises';
import { printSchema } from 'graphql/utilities';
import path from 'path';

import { schema } from '../src/schema/schema';

(async () => {
    try {
        await fs.writeFile(
            path.join(__dirname, "../schema/schema.graphql"),
            printSchema(schema)
        );

        await fs.writeFile(
            path.join(__dirname, "../../front/schema/schema.graphql"),
            printSchema(schema)
        );
    } catch (error) {
        console.error('Error writing schema:', error);
        process.exit(1);
    }

    process.exit(0);
})();
