interface SuccessResponse<T> {
  success: true;
  data: T;
}
interface ErrorResponse {
  success: false;
  error: unknown;
}

async function promise<T>(
  callback: () => Promise<T>,
  logError = false,
): Promise<SuccessResponse<T> | ErrorResponse> {
  try {
    const data = await callback();
    return { success: true, data };
  } catch (error) {
    if (logError) {
      console.error(error);
    }
    return { success: false, error };
  }
}

export default promise;
