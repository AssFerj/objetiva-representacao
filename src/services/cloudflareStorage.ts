export interface UploadFileParams {
  file: File;
  fileName: string;
  metadata?: {
    userId: string;
    userEmail: string;
    uploadedAt: string;
  };
}

export const uploadToCloudflare = async ({ file, fileName, metadata }: UploadFileParams): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading to Cloudflare R2:', error);
    throw new Error('Erro ao enviar arquivo para o armazenamento');
  }
};
