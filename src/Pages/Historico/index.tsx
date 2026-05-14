import { useState, useRef } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Snackbar,
    Tab,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { Close, ContentCopy, Delete, FileDownload, FileUpload, History, SaveAlt, Search, UploadFile } from "@mui/icons-material";
import { HistoricoCard } from "./HistoricoCard";
import { IHistoricoItem } from "../useIndex";
import { useIndexHistorico } from "./useIndexHistorico";
interface Props {
    historico: IHistoricoItem[];
    importarHistorico?: (items: IHistoricoItem[]) => void;

    funcoes?: {
        limparHistorico?: () => void;
        excluirHistoricoById?: (id: number) => void;
        editarHistorico?: (item: IHistoricoItem) => void;
    };
}

const downloadJSON = (items: IHistoricoItem[], filename: string) => {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};

const copyJSON = async (items: IHistoricoItem[]) => {
    await navigator.clipboard.writeText(JSON.stringify(items, null, 2));
};

export const Historico = ({ historico, importarHistorico, funcoes }: Props) => {
    const { busca, setBusca, historicoFiltrado } = useIndexHistorico({ historico });

    const [importOpen, setImportOpen] = useState(false);
    const [importTab, setImportTab] = useState(0);
    const [jsonText, setJsonText] = useState("");
    const [jsonError, setJsonError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [exportOpen, setExportOpen] = useState(false);
    const [exportItems, setExportItems] = useState<IHistoricoItem[]>([]);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const parsed = JSON.parse(text);
                const items = Array.isArray(parsed) ? parsed : [parsed];
                importarHistorico?.(items);
                setImportOpen(false);
                setJsonText("");
                setJsonError("");
            } catch {
                setJsonError("Arquivo inválido. Verifique se é um JSON válido.");
            }
        };
        reader.readAsText(file);
        e.target.value = "";
    };

    const handleTextImport = () => {
        try {
            const parsed = JSON.parse(jsonText);
            const items = Array.isArray(parsed) ? parsed : [parsed];
            importarHistorico?.(items);
            setImportOpen(false);
            setJsonText("");
            setJsonError("");
        } catch {
            setJsonError("JSON inválido. Verifique a formatação.");
        }
    };

    const openExportDialog = (items: IHistoricoItem[]) => {
        setExportItems(items);
        setExportOpen(true);
    };

    const handleDownload = () => {
        const isSingle = exportItems.length === 1;
        const name = isSingle ? exportItems[0].nome || "item" : "historico";
        downloadJSON(exportItems, `precificacao_3d_${name}_${new Date().toISOString().split('T')[0]}.json`);
        setExportOpen(false);
    };

    const handleCopy = async () => {
        await copyJSON(exportItems);
        setExportOpen(false);
        setToastMsg("JSON copiado para a área de transferência!");
        setToastOpen(true);
    };

    return (
        <Box mt={5}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={4}
            >
                <Typography
                    variant="h5"
                    color="textPrimary"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <History />
                    Histórico
                </Typography>

                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <TextField
                        size="small"
                        variant="filled"
                        label="Pesquisar por nome"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {busca ? (
                                            <IconButton
                                                size="small"
                                                onClick={() => setBusca("")}
                                            >
                                                <Close fontSize="small" color="error" />
                                            </IconButton>
                                        ) : (
                                            <Search fontSize="small" color="primary" />
                                        )}
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {importarHistorico && (
                        <Tooltip title="Importar histórico">
                            <IconButton onClick={() => setImportOpen(true)} color="primary">
                                <FileDownload />
                            </IconButton>
                        </Tooltip>
                    )}
                    {historico.length > 0 && (
                        <Tooltip title="Exportar histórico">
                            <IconButton onClick={() => openExportDialog(historico)} color="primary">
                                <FileUpload />
                            </IconButton>
                        </Tooltip>
                    )}

                    {funcoes?.limparHistorico && (
                        <Tooltip title="Limpar histórico">
                            <IconButton onClick={funcoes.limparHistorico}>
                                <Delete color="error" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>

            <Divider sx={{ my: 2, bgcolor: "text.primary" }} />

            {historicoFiltrado.length > 0 && (
                <Grid container spacing={2}>
                    {historicoFiltrado.map((item) => {
                        return (
                            <Grid
                                key={item.id}
                                size={{
                                    xs: 12,
                                    sm: 4
                                }}
                            >
                                <HistoricoCard
                                    key={item.id}
                                    item={item}
                                    onDelete={funcoes?.excluirHistoricoById}
                                    onEdit={funcoes?.editarHistorico}
                                    onExport={openExportDialog}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            )}

            {historicoFiltrado.length === 0 && historico.length > 0 && (
                <Typography color="text.secondary" textAlign="center" mt={2}>
                    Nenhum item encontrado com esse nome.
                </Typography>
            )}

            {historico.length === 0 && (
                <Typography color="text.secondary" textAlign="center" mt={2}>
                    Nenhum item no histórico.
                </Typography>
            )}

            <Dialog open={importOpen} onClose={() => setImportOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Importar Histórico</DialogTitle>
                <DialogContent>
                    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                        <Tab
                            label="Arquivo"
                            onClick={() => setImportTab(0)}
                            sx={{ fontWeight: importTab === 0 ? 700 : 400 }}
                        />
                        <Tab
                            label="Colar JSON"
                            onClick={() => setImportTab(1)}
                            sx={{ fontWeight: importTab === 1 ? 700 : 400 }}
                        />
                    </Box>

                    {importTab === 0 ? (
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={4}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json"
                                style={{ display: "none" }}
                                onChange={handleFileImport}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<UploadFile />}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Selecionar arquivo JSON
                            </Button>
                            {jsonError && (
                                <Typography color="error" variant="caption">
                                    {jsonError}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                multiline
                                rows={10}
                                fullWidth
                                placeholder="Cole o JSON do histórico aqui..."
                                value={jsonText}
                                onChange={(e) => { setJsonText(e.target.value); setJsonError(""); }}
                                error={!!jsonError}
                                helperText={jsonError}
                            />
                            <Button variant="contained" onClick={handleTextImport}>
                                Importar
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setImportOpen(false); setJsonText(""); setJsonError(""); }}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={exportOpen} onClose={() => setExportOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Exportar {exportItems.length === 1 ? exportItems[0]?.nome || "item" : "histórico"}</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} py={2}>
                        <Button variant="outlined" startIcon={<SaveAlt />} onClick={handleDownload} fullWidth>
                            Baixar arquivo JSON
                        </Button>
                        <Button variant="outlined" startIcon={<ContentCopy />} onClick={handleCopy} fullWidth>
                            Copiar JSON
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setExportOpen(false)}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                message={toastMsg}
            />
        </Box>
    );
};