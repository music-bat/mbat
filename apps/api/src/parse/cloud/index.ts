import './beforeSave';
import './beforeDelete';
import './afterSave';
import './afterDelete';
import './functions';

const DEBUG_ENABLED = process.env.CLOUD_CODE_DEBUGGING == 'true' || true;
console.log(
  '[Cloud Code] Successfully Connected!' + DEBUG_ENABLED
    ? ' Debug mode enabled'
    : '',
);
